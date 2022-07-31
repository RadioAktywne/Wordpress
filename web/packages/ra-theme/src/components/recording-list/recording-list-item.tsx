import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-image";
import { Packages } from "../../../types";
import { RecordingEntity } from "../../data";
import Arrow from '../../img/icons/arrow.svg';

/**
 * The props of the {@link RecordingListItem} component.
 */
interface ItemProps {
  /**
   * The recording that should be shown.
   */
  item: RecordingEntity;
}

/**
 * Recording List item Component.
 *
 * It renders the preview of a recording.
 *
 * @param props - Defined in {@link ItemProps}.
 *
 * @returns The rendered recording.
 */
function RecordingListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  return (
    <article>
      <Container>
        <Title>{item.title.rendered}</Title>
        <BackButton><Link link={item.link}><img src={Arrow} alt="pokaż więcej"/></Link></BackButton>
      </Container>
    </article>
  );
}

// Connect the RecordingListItem to gain access to `state` as a prop
export default connect(RecordingListItem);

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  color: white;

  &:nth-of-type(2n+1) > div
  {
    background-color: rgba(60, 60, 76, 0.8);
  }

  &:nth-of-type(2n) > div
  {
    background-color: #3c3c4c;
  }
`

const Title = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;


  &:hover 
  {
    background-color: #6aba9c !important;
    cursor: pointer;
  }
`

const BackButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: solid #6aba9c 2px;

  & > a > img 
  {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
`