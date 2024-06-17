CREATE MIGRATION m1vaznze5thuqyhwtxb2alqftnztc22kjouibhf4eh5ywou2sa4fca
    ONTO m1gdebwb666egvejds6kncq7mcrzmove2shrwyy6j7m3fx4djwz7xq
{
  ALTER TYPE app_cm::CmCsfJobPlacement {
      DROP LINK employer;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE PROPERTY employerContactName: std::str;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE PROPERTY employerEmail: std::str;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE REQUIRED PROPERTY employerName: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE PROPERTY employerPhone: std::str;
  };
  DROP TYPE app_cm::CmEmployer;
};
