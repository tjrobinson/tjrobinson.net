import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/relatedBookmarks.scss"
import { classNames } from "../util/lang"
import { formatDate } from "./Date"
import { getRelatedBookmarks, loadTagIndex } from "../util/bookmarks"

const RelatedBookmarks: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  if (!tags || tags.length === 0) {
    return null
  }
  const bookmarks = getRelatedBookmarks(loadTagIndex(), tags)
  if (bookmarks.length === 0) {
    return null
  }
  return (
    <div class={classNames(displayClass, "related-bookmarks")}>
      <h3>Related bookmarks ({bookmarks.length})</h3>
      <ul>
        {bookmarks.map((b) => (
          <li>
            <a href={b.link} class="external">
              {b.title}
            </a>
            <span class="bookmark-meta">
              {b.domain} · {formatDate(new Date(b.created), cfg.locale)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

RelatedBookmarks.css = style

export default (() => RelatedBookmarks) satisfies QuartzComponentConstructor
