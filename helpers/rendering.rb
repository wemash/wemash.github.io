require "haml"

def renderer_for file
  Haml::Engine.new(File.read(file))
end

def render glyph
  renderer_for("cloning-tank/glyphs/#{glyph}.haml").render
end

def tile size, options = {}
  post = next_post
  return "" unless post

  locals = {}
  locals[:post] = post
  locals[:size] = size
  locals[:classes] = [size]
  locals[:classes] << "shift-#{options[:shift]}" if options[:shift]
  locals[:meta] = Meta.for(post)
  renderer_for("cloning-tank/tile.haml").render Object.new, locals
end

def tiny options = {}
  tile :tiny, options
end

def huge options = {}
  tile :huge, options
end

def wide options = {}
  tile :wide, options
end

def tall options = {}
  tile :tall, options
end
