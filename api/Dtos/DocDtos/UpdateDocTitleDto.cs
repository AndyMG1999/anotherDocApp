using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.DocDtos
{
    public class UpdateDocTitleDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
    }
}