=begin

Register and cycle through some glyphs

Glyphs are collections of posts that are put together to look like a letter or
symbol or something. The partials that render the glyphs are stored in
`cloning-tank/glyphs`. These helper methods make it so that the home page can
cycle through a list of glyphs and keep rendering until we run out of posts.

=end

$glyphs = []

# Register some glyphs
# The glyph names should match exactly with the name of each partial that the
# glyph represents. They can be strings or symbols.
def glyphs *some_glyphs
  $glyphs = some_glyphs
end

# Get the next glyph in the list
def next_glyph
  $glyphs.rotate! && $glyphs.last
end
