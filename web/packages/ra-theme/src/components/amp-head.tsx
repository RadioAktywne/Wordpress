import { Head } from "frontity";

export default function AmpHead() {
  return (
    // @ts-ignore
    <Head>
      <script
        async={undefined}
        custom-element="amp-bind"
        src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
      ></script>
    </Head>
  );
}
