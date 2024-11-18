CREATE MIGRATION m1433efc66vjufvcc5styl6vrkciw6hojgg5w73xzu5pspeb7wgkza
    ONTO m1fkmgyv6v5aqnw4e325jqufw7a4balrf422jtniw42peekkcyliua
{
  ALTER TYPE sys_core::SysCode {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::ObjRoot>{});
      };
  };
};
