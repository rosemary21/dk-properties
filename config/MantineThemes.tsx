import { CssLoader } from "@/utils/Loader";
import { Loader, createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: "custom",
      },
    }),
  },
});

export default theme;
