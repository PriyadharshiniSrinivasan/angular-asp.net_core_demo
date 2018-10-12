using System;
using System.Collections.Generic;

namespace EFNgApp.Models
{
    public partial class TblUsers
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public string Role { get; set; }
    }
}
