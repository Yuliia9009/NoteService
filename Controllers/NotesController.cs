using Microsoft.AspNetCore.Mvc;
using NoteService.Data;
using NoteService.Models;

namespace NoteService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext _context;

        public NotesController(NotesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Note>> Get()
        {
            return Ok(_context.Notes.ToList());
        }

        [HttpPost]
        public ActionResult<Note> Post([FromBody] Note note)
        {
            _context.Notes.Add(note);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = note.Id }, note);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var note = _context.Notes.Find(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            _context.SaveChanges();
            return NoContent();
        }
    }
}