import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { InfoTileArchiveData, InfoTileEntity } from "../../data";
import InfoTileListItem from "./info-tile-list-item";

/**
 * Props received by the {@link InfoTileList} component.
 */
interface ListProps {
  /**
   * Data object representing an archive link.
   */
  data: InfoTileArchiveData;

  /**
   * Flag used by Frontity's {@link Switch} component to decide whether
   * this component should be rendered.
   */
  when?: boolean;
}

/**
 * Component that renders the list of info tiles,
 * passed as an {@link InfoTileArchiveData} object.
 *
 * @param props - Object of type {@link ListProps}.
 * @returns React component.
 */
function InfoTileList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  const tileMap = data.items.reduce((acc, { type, id }) => {
    const item = state.source[type][id];
    const itemType = (item.acf.link as String).split("/");
    acc[itemType[itemType.length - 2]] = item;
    return acc;
  }, {} as Record<number, InfoTileEntity>);

  return (
    <Container>
      <Grid>
        <Span2>
          {tileMap["events"] && <InfoTileListItem item={tileMap["events"]} />}
        </Span2>
        <Span1>
          {tileMap["members"] && <InfoTileListItem item={tileMap["members"]} />}
        </Span1>
        <Span2>
          {tileMap["members"] && <InfoTileListItem item={tileMap["members"]} />}
        </Span2>
        <Span1>
          {tileMap["events"] && <InfoTileListItem item={tileMap["events"]} />}
        </Span1>
      </Grid>
    </Container>
  );
}

export default connect(InfoTileList);

const Container = styled.section`
  width: 800px;
  margin: 0;
  padding: 24px;
  list-style: none;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  grid-gap: 10px;
`;

const Span1 = styled.div`
  grid-column: span 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Span2 = styled.div`
  grid-column: span 2;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
