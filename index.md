{% for post in site.posts %}
  {% include card.html title=post.title url=post.url date-time=post.date excerpt=post.excerpt cta='Read Post' %}
{% endfor %}
