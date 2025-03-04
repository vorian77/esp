CREATE MIGRATION m12tnnihm45y6weis33whre4vl6aowtznclzrskeykw6farvxburvq
    ONTO m1pvhk7i4skprbypy4ld6kxreimox7zz3gj4qfhztja2ouszlj6mta
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
};
