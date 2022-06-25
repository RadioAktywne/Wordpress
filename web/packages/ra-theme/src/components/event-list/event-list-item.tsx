import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { EventEntity } from "../../data";

/**
 * The props of the {@link EventListItem} component.
 */
interface ItemProps {
  /**
   * The event that should be shown.
   */
  item: EventEntity;
}

/**
 * Event List item Component.
 *
 * It renders the preview of an event.
 *
 * @param props - Defined in {@link ItemProps}.
 *
 * @returns The rendered event.
 */
function EventListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  return (
    <article>
      <Link link={item.link}>
        <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
      </Link>

      <div>
        {/* If the event post has an author, we render a clickable author text. */}
        {author && (
          <StyledLink link={author.link}>
            <AuthorName>
              By <b>{author.name}</b>
            </AuthorName>
          </StyledLink>
        )}
        <PublishDate>
          {" "}
          on <b>{date.toDateString()}</b>
        </PublishDate>
      </div>
    </article>
  );
}

// Connect the EventListItem to gain access to `state` as a prop
export default connect(EventListItem);

const Title = styled.h1`
  font-size: 2rem;
  color: rgba(12, 17, 43);
  margin: 0;
  padding-top: 24px;
  padding-bottom: 8px;
  box-sizing: border-box;
`;

const AuthorName = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const PublishDate = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;
