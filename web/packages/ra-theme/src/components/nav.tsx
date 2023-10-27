import { isHome, isPage, isPost, isPostArchive } from "@frontity/source";
import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import {
  isAlbum,
  isAlbumArchive,
  isEvent,
  isEventArchive,
  isInfoTile,
  isInfoTileArchive,
  isMember,
  isMemberArchive,
  isRecording,
  isRecordingArchive,
  isShow,
  isShowArchive,
} from "../data";
import Link from "./link";

/**
 * The navigation component. It renders the navigation links.
 *
 * @returns The `<nav>` tag with the menu.
 */
function Nav(): JSX.Element {
  const { state } = useConnect<Packages>();

  return (
    <NavContainer>
      {state.theme.menu.map(([name, link], number) => {
        const data = state.source.get(state.router.link);

        const belongsToCurrentMenu = () => {
          switch (link) {
            case state.config.pages.home.path:
              return isHome(data);
            case state.config.posts.recording.archivePath:
              return isRecording(data) || isRecordingArchive(data);
            case state.config.posts.album.archivePath:
              return isAlbum(data) || isAlbumArchive(data);
            case state.config.posts.post.archivePath:
              return isPost(data) || isPostArchive(data);
            case state.config.posts.info.archivePath:
              return (
                isInfoTile(data) ||
                isInfoTileArchive(data) ||
                isMember(data) ||
                isMemberArchive(data) ||
                isShow(data) ||
                isShowArchive(data) ||
                isEvent(data) ||
                isEventArchive(data) ||
                (isPage(data) && !isHome(data))
              );
          }
        };

        const highlight = belongsToCurrentMenu();

        return (
          <NavItem
            key={`${number} - ${name}`}
            className={highlight ? "noBorder" : "border" + (number % 4)}
          >
            <Link link={link} aria-current={highlight ? "page" : undefined}>
              {name}
            </Link>
          </NavItem>
        );
      })}
    </NavContainer>
  );
}

export default connect(Nav);

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow-x: auto;

  @media (max-width: 940px) {
  {
    align-self: flex-end;
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

const NavItem = styled.div`
  margin: 0;
  color: #fff4dc;
  font-size: 1rem;

  @media (max-width: 1400px) {
    font-size: 12px;
  }

  font-family: sans-serif;
  box-sizing: border-box;
  flex-shrink: 0;

  &.border0 {
    border-top: solid 18px #e85a57;
  }

  &.border1 {
    border-top: solid 18px #fff55a;
  }

  &.border2 {
    border-top: solid 18px #6aba9c;
  }

  &.border3 {
    border-top: solid 18px #7190bc;
  }

  &.noBorder {
    border-top: solid 18px #30241a;
  }

  & > a {
    display: inline-block;
    line-height: 45px;
    padding: 0 20px;
    border-bottom-color: transparent;

    &[aria-current="page"] {
      background-color: #fff4dc !important;
      color: #30241a !important;
    }
  }

  &:hover > a {
    background-color: #594d40;
    color: #fff4dc;
  }
`;
