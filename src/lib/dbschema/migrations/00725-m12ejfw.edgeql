CREATE MIGRATION m12ejfwb2gv57plh6kf5doonwgemyxr6yerve5fabm5iw2jm6vadgq
    ONTO m1ar24wfotwl6dtbyp7pvobmepodzb3yckowxi2sltdtuaibqnvhva
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customEmbedShellFields {
          ON TARGET DELETE ALLOW;
      };
  };
};
