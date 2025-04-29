using Microsoft.EntityFrameworkCore;
using NoteService.Models;

namespace NoteService.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }
    }
}