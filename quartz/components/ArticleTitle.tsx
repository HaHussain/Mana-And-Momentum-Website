import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { getIconForSlug } from "../util/iconUtils" // Import icon helper
import { IconElement } from "./IconElement" // Import icon component

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const slug = fileData.slug!
  const icon = getIconForSlug(slug) // Get icon for current slug

  if (title) {
    return (
      <h1 class={classNames(displayClass, "article-title")}>
        {icon && <IconElement icon={icon} className="title-icon" />}
        {title}
      </h1>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
  display: flex;
  align-items: center;
}

.article-title .title-icon {
  margin-right: 0.75rem;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
