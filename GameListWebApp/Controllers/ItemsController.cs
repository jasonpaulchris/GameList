using GameListWebApp.Data;
using GameListWebApp.Data.Items;
using GameListWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GameListWebApp.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private ApplicationDbContext DbContext;
        public ItemsController(ApplicationDbContext context)
        {
            DbContext = context;
        }

        [HttpGet("id")]
        public IActionResult Get(int id)
        {
            var item = DbContext.Items.Where(i => i.Id == id).FirstOrDefault();
            if (item != null) return new JsonResult(TinyMapper.Map<ItemViewModel>(item),
                DefaultJsonSettings);
            else return NotFound(new { Error = String.Format("Item ID {0} has not been found", id) });
        }

        [HttpPost()]
        public IActionResult Add([FromBody]ItemViewModel ivm)
        {
            if (ivm != null)
            {
                var item = TinyMapper.Map<Item>(ivm);
                item.CreatedDate = DateTime.Now;
                item.LastModifiedDate = DateTime.Now;
                item.UserId = DbContext.Users.Where(u => u.UserName == "Admin").FirstOrDefault().Id;
                DbContext.Items.Add(item);
                DbContext.SaveChanges();
                return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);

            }
            return new StatusCodeResult(500);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]ItemViewModel ivm)
        {
            if (ivm != null)
            {
                var item = DbContext.Items.Where(i => i.Id == id).FirstOrDefault();
                if (item != null)
                {
                    item.UserId = ivm.UserId;
                    item.Description = ivm.Description;
                    item.Flags = ivm.Flags;
                    item.Notes = ivm.Notes;
                    item.Text = ivm.Text;
                    item.Title = ivm.Title;
                    item.Type = ivm.Type;
                    item.LastModifiedDate = DateTime.Now;
                    DbContext.SaveChanges();
                    return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
                }
            }
            return NotFound(new { Error = String.Format("Item ID {0} has not been found", id) });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = DbContext.Items.Where(i => i.Id == id).FirstOrDefault();
            if (item != null)
            {
                DbContext.Items.Remove(item);
                DbContext.SaveChanges();
                return new OkResult();
            }

            return NotFound(new { Error = String.Format("Item ID {0} has not been found", id) });
        }

        [HttpGet("GetLatest")]
        public IActionResult GetLatest()
        {
            return GetLatest(DefaultNumberOfItems);
        }

        [HttpGet("GetLatest/{n}")]
        public IActionResult GetLatest(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = GetSampleItems().OrderByDescending(i => i.CreatedDate).Take(n);

            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed()
        {
            return GetMostViewed(DefaultNumberOfItems);
        }

        [HttpGet("GetMostViewed/{n}")]
        public IActionResult GetMostViewed(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = DbContext.Items.OrderByDescending(i => i.ViewCount).Take(n).ToArray();

            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }

        [HttpGet("GetRandom")]
        public IActionResult GetRandom()
        {
            return GetRandom(DefaultNumberOfItems);
        }

        [HttpGet("GetRandom/{n}")]
        public IActionResult GetRandom(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = DbContext.Items.OrderByDescending(i => Guid.NewGuid()).Take(n).ToArray();

            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }

        private List<ItemViewModel> GetSampleItems(int num = 999)
        {
            List<ItemViewModel> lst = new List<ItemViewModel>();
            DateTime date = new DateTime(2015, 12, 31).AddDays(-num);
            for (int id = 1; id <= num; id++)
            {
                lst.Add(new ItemViewModel()
                {
                    Id = id,
                    Title = String.Format("Item {0} Title", id),
                    Description = String.Format("Sample description for item {0}: Lorem", id),
                    CreatedDate = date.AddDays(id),
                    LastModifiedDate = date.AddDays(id),
                    ViewCount = num - id
                });
            }

            return lst;
        }



        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }

        private int DefaultNumberOfItems
        {
            get
            {
                return 5;
            }
        }

        private int MaxNumberOfItems
        {
            get
            {
                return 100;
            }
        }

        private List<ItemViewModel> ToItemViewModelList(IEnumerable<Item> items)
        {
            var lst = new List<ItemViewModel>();
            foreach (var i in items)
                lst.Add(TinyMapper.Map<ItemViewModel>(i));
            return lst;

        }


    }
}
