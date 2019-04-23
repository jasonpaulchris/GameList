﻿using GameListWebApp.Data.Items;
using GameListWebApp.Data.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameListWebApp.Data.Comments
{
    public class Comment
    {
        public Comment()
        {

        }

        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser Author { get; set; }
        [ForeignKey("ParentId")]
        public virtual Comment Parent { get; set; }
        public virtual List<Comment> Children { get; set; }


        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int ItemId { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags { get; set; }
        [Required]
        public string UserId { get; set; }
        public int? ParentId { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
    }
}
