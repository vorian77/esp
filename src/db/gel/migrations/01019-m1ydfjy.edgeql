CREATE MIGRATION m1ydfjyjqcoub4ebbs7kzah43wbnaknn4sv6q2odn2vz2iswy4we6q
    ONTO m1rplzk752ijt6j662ypees6hrgh6ft2ugyhky3zlno437pe6b4i4a
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrSite {
          RENAME TO objAttrSFSite;
      };
  };
};
