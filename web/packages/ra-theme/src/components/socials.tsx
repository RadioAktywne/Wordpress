import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import { Packages } from "../../types";
import YouTube from '../img/social/ytlogo.svg';
import Instagram from '../img/social/iglogo.svg';
import Facebook from '../img/social/fblogo.svg';
import Spotify from '../img/social/sflogo.svg';

/**
 * Socials icons.
 *
 * @returns The socials element.
 */

function Socials(props) {
  const { state } = useConnect<Packages>();
  return (
    <>
      <Container>
        <Link link={props.yt} target="_blank">
            <img
                alt="YouTube" 
                src={YouTube}
            /> 
        </Link>

        <Link link={props.ig} target="_blank">
            <img
                alt="Instagram" 
                src={Instagram}
            /> 
        </Link>

        <Link link={props.fb} target="_blank">
            <img
                alt="Facebook" 
                src={Facebook}
            /> 
        </Link>

        <Link link={props.sf} target="_blank">
            <img
                alt="Spotify" 
                src={Spotify}
            /> 
        </Link>
      </Container>
    </>
  );
}

export default connect(Socials);

const Container = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: row;

  & > a > img
  {
    height: 30px;
    width: auto;
    padding-left: 20px;
  }

  @media (max-width: 560px)
  {
    & > a > img
    {
      height: 22px;
    }

    flex-wrap: wrap;
    margin-right: 40px;
  }
`;
