using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.DocDtos;

namespace api.Models
{
    public class Document
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string Content { get; set; } = "";
        public DocOwnerDto? OwnedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastEdit { get; set; }
    }
}