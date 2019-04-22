using GameListWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace GameListWebApp.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        [HttpGet("GetLatest/{n}")]
        public IActionResult GetLatest(int n)
        {
            var items = GetSampleItems().OrderByDescending(i => i.CreatedDate).Take(n);

            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("GetMostViewed/{n}")]
        public IActionResult GetMostViewed(int n)
        {
            var items = GetSampleItems().OrderByDescending(i => i.ViewCount).Take(n);

            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("GetRandon/{n}")]
        public IActionResult GetRandom(int n)
        {
            var items = GetSampleItems().OrderByDescending(i => Guid.NewGuid()).Take(n);

            return new JsonResult(items, DefaultJsonSettings);
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


    }
}
