CREATE MIGRATION m1s73tedyoeaxzqoweefmysnmb5ey64duzrb4ga7hr35lujhoo42xa
    ONTO m1kxjnnxppljlsvw7hrxovulkvq3x4jkmygdd6ontpjp5zy6j3cp6q
{
          ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          ON SOURCE DELETE ALLOW;
      };
  };
};
