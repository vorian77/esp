CREATE MIGRATION m1fdcicll4awovtylwlemyn7oemn3jmiehp5qvxqgodywo2ae4skla
    ONTO m1ydfjyjqcoub4ebbs7kzah43wbnaknn4sv6q2odn2vz2iswy4we6q
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrSFSite {
          RENAME TO objAttrSfSite;
      };
  };
};
