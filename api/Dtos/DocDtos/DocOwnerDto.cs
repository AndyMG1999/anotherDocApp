namespace api.Dtos.DocDtos
{
    public class DocOwnerDto
    {
        public string? UserId { get; set; } = "";
        public string? UserName { get; set; } = "";
        public byte[]? ProfileImage { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}