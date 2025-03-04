CREATE MIGRATION m1yrh5re53q7py757gxs2bf6lke23j62j4teh5bazhvjscmpfcszbq
    ONTO m1dbz253x3om6zinhhrxflqexg2n5wpevgwl4skv67h7rn77fws64q
{
                              ALTER TYPE app_cm::CmCsfJobPlacement {
      DROP LINK employerContact;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE PROPERTY employerContactEmail: std::str;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE PROPERTY employerContactNameFirst: std::str;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE PROPERTY employerContactNameLast: std::str;
  };
};
