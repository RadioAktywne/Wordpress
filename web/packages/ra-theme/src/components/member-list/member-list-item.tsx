import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-image";
import { Packages } from "../../../types";
import { AlbumEntity, MemberEntity } from "../../data";

/**
 * The props of the {@link MemberListItem} component.
 */
interface ItemProps {
  /**
   * The member that should be shown.
   */
  item: MemberEntity;
}

function MemberListItem({ item }: ItemProps): JSX.Element {
  const {} = useConnect<Packages>();

  return (
    <Container>
      <article>
        <Link link={item.link}>
          <Cover>
            {item.acf.image && <FeaturedMedia id={item.acf.image} />}
            <Title>
              <MemberName>{item.acf.name}</MemberName>

              <SongTitle>{item.acf.role}</SongTitle>
            </Title>
          </Cover>
        </Link>
      </article>
    </Container>
  );
}

// Connect the MemberListItem to gain access to `state` as a prop
export default connect(MemberListItem);

const MemberName = styled.h5`
  color: #fff;
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: 1rem;

  padding-left: 10px;
  padding-top: 10px;
`;

const SongTitle = styled.h3`
  color: #fff;
  margin: 0;
  font-size: 1.3rem;
  padding: 0;

  padding-left: 10px;
  padding-bottom: 10px;
`;

const Container = styled.h1`
  width: 100%;
  height: 275px;
  margin-bottom: 0px;
`;

const Title = styled.div`
  background-color: rgba(60, 60, 76, 0.6);

  position: absolute;

  width: 100%;
  bottom: 0;
`;

const Cover = styled.div`
  height: 275px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  @media (max-width: 750px) {
  }
`;
