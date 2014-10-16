=begin

Gather a list of posts for rendering

The build script first iterates over all the published posts (posts with a
_post file in their root) and puts the URL for each one into `src/posts`. The
posts helper extracts each one, and shifts them off a list until they are all
gone.

=end

$posts = (File.readlines("src/posts") || []).map {|l| l.strip}
$posts.reject! {|post| post.empty?}

# Get another post from the list
# The post will be removed from the list, so don't lose it
def next_post
  $posts.shift
end

# Determine if any posts are left in the list
def posts_remaining?
  !$posts.empty?
end
