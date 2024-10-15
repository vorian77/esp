CREATE MIGRATION m1o266frw2vh765r4iq42jgqje5o6nyjsei7j7ss4a5upihvsldzzq
    ONTO m1433efc66vjufvcc5styl6vrkciw6hojgg5w73xzu5pspeb7wgkza
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK owner {
          RENAME TO ownerOld;
      };
  };
};
