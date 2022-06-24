import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import FeaturedMedia from "./featured-media";
import { InfoTileData, InfoTileEntity } from "../data";

/**
 * Properties received by the `InfoTile` component.
 */
interface InfoTileProps {
  /**
   * Data element representing a URL in your frontity site.
   */
  data: InfoTileData;

  /**
   * Whether to render this component.
   */
  when?: boolean;
}

/**
 * The InfoTile component that is used to render info tiles
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <InfoTile when={data.isInfoTile} />
 * </Switch>
 * ```
 *
 * @returns The {@link InfoTile} element rendered.
 */
const InfoTile = ({ data }: InfoTileProps): JSX.Element => {
  const { state } = useConnect<Packages>();
  // Get the data of the infoTile.
  const infoTile: InfoTileEntity = state.source[data.type][data.id];

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <div>
        <Title>
          <a href={infoTile.acf.link}>{infoTile.acf.title}</a>
        </Title>
      </div>

      {/* Look at the settings to see if we should include the featured image */}
      {state.theme.featured.showOnPost && infoTile.acf.image && (
        <FeaturedMedia id={infoTile.acf.image} />
      )}
    </Container>
  ) : null;
};

export default connect(InfoTile);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;

const Title = styled.h1`
  margin: 24px 0 8px;
  color: rgba(12, 17, 43);
`;
