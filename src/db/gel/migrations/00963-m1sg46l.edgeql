CREATE MIGRATION m1sg46ld2lq5xz74bbi2634tzrkp22lakide2pj74oe57eknydvhiq
    ONTO m1l4aep3fjoxcsz3jshoslzpxeuhc6uvkkhjbdto6t3pbqrkykpoaa
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK data {
          RESET ON SOURCE DELETE;
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
