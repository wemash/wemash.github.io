require "test/unit"
require_relative "../helpers/glyphs"

class GlyphsTest < Test::Unit::TestCase
  def test_can_register_glyphs
    glyphs :hello, :there
    assert $glyphs.include? :hello
  end

  def test_can_cycle_glyphs
    glyphs :a, :b, :c, :d
    assert_equal next_glyph, :a
    assert_equal next_glyph, :b
    assert_equal next_glyph, :c
    assert_equal next_glyph, :d
    assert_equal next_glyph, :a
  end
end
