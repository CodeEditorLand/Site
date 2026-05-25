import type { BlogPost } from "./Interface/Content/Page/Blog.js";

const DynamicBlogCard = ({ Post }: { Post: BlogPost }) => (
	<article className="StaccatoCard bg-[var(--ColorCard)] p-6">
		{Post.Tags.length > 0 && (
			<div className="mb-3 flex flex-wrap gap-2">
				{Post.Tags.map((Tag) => (
					<span
						key={Tag}
						className="bg-[var(--ColorMute)] px-2 py-0.5 font-medium text-muted-foreground">
						{Tag}
					</span>
				))}
			</div>
		)}
		<h3 className="mb-2 text-xl font-semibold">{Post.Title}</h3>
		<p className="mb-4 text-muted-foreground">{Post.Summary}</p>
		<div className="flex items-center justify-between text-muted-foreground">
			<span>{Post.Author}</span>
			<span>{Post.ReadTime} min read</span>
		</div>
	</article>
);

export { DynamicBlogCard };
export default DynamicBlogCard;
