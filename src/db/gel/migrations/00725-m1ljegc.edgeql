CREATE MIGRATION m1ljegcawx7ltnzldrokmbyxfuv34mzuatungg4576zm6cw75rqdyq
    ONTO m1ar24wfotwl6dtbyp7pvobmepodzb3yckowxi2sltdtuaibqnvhva
{
              ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiCerts;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiExams;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiItemsIncluded;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiItemsNotIncluded;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiRqmts;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY courseCertifications: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY courseExams: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY courseItemsIncluded: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY courseItemsNotIncluded: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY courseRequirements: std::str;
  };
  ALTER TYPE app_cm::CmCsfCohort {
      DROP PROPERTY dateEnd;
      DROP PROPERTY dateEndEst;
      DROP PROPERTY dateReferral;
      DROP PROPERTY dateStart;
      DROP PROPERTY dateStartEst;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customEmbedShellFields {
          ON TARGET DELETE ALLOW;
      };
  };
};
