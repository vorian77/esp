CREATE MIGRATION m1my25zjsuzccfmeb4kwi4p64ajkndeljzwz4fwmu2band76sirgqq
    ONTO m1sje23p74rvouvuyseumionymr25mjawwrly6dxsdusfvjfkitp7q
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
      DROP LINK personOld;
  };
};
