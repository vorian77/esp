CREATE MIGRATION m1tmicgq4jkeivsz3ofhzap5w7h22k6xjhauhrnp2ukcqbjuayky7q
    ONTO m1uxvmhcwimxlbo3u6h6duk2caqv2r7yprdw2c3gycb3trrr5paeza
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER PROPERTY note {
          RENAME TO noteOld;
      };
  };
};
