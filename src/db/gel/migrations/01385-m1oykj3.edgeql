CREATE MIGRATION m1oykj3ck4sglgwu676n63mfgwf3t5xuzi4upandcbvxowgr73tbia
    ONTO m1lsxhczlfonwlk5xnvlgg2lpvk25bscui36pnuotxrmyeuohzgjxq
{
  ALTER TYPE app_cm::CmProgram {
      ALTER LINK eligibility {
          ON TARGET DELETE ALLOW;
      };
  };
};
