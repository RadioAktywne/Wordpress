import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { MemberEntity } from "../../data";
import FeaturedImage from "../featured-image";
import DefaultImage from "../default-image";
import defaultImageMedia from "../../img/defaultMedias/defaultMedia.png";

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
            {item.acf.image ? (
              <FeaturedImage id={item.acf.image} />
            ) : (
              <DefaultImage img={defaultImageMedia} />
            )}
            <Title>
              <MemberName>{item.acf.name}</MemberName>

              <MemberRole>{item.acf.role}</MemberRole>
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

const MemberRole = styled.h3`
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
