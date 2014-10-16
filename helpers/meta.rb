=begin

Read post metadata inside a HAML partial

=end

# Get the value of a meta attribute
# @param post The post URL
# @param path The path to the meta attribute you care about
def value_of post, path
  File.read File.join("src", post, "meta", path)
end

# A meta object gives helpers and partials access to a post's on-disk metadata.
# Currently, the following metadata is gathered:
# 
# * full_title The full title of the post
# * tiny_title A special short title for use on tiny and tall tiles
Meta = Struct.new :full_title, :tiny_title do
  def self.for post
    full_title = value_of post, "title/full"
    tiny_title = value_of post, "title/tiny"
    Meta.new full_title, tiny_title
  end

  # Get the right title for a specific tile size
  def title_for size
    return self.full_title if [:huge, :wide].include? size
    return self.tiny_title if [:tiny, :tall].include? size
  end
end
