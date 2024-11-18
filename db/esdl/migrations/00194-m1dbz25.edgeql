CREATE MIGRATION m1dbz253x3om6zinhhrxflqexg2n5wpevgwl4skv67h7rn77fws64q
    ONTO m1vaznze5thuqyhwtxb2alqftnztc22kjouibhf4eh5ywou2sa4fca
{
                  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE LINK employerContact: default::SysPerson {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      DROP PROPERTY employerContactName;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      DROP PROPERTY employerEmail;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      DROP PROPERTY employerPhone;
  };
};
