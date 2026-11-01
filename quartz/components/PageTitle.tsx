import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  // render a trailing domain suffix (e.g. ".net") in the accent colour
  const dot = title.lastIndexOf(".")
  const [name, suffix] = dot > 0 ? [title.slice(0, dot), title.slice(dot)] : [title, ""]
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        {name}
        {suffix && <span class="page-title-suffix">{suffix}</span>}
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
  letter-spacing: -0.02em;
}

.page-title-suffix {
  color: var(--secondary);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
