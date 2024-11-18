CREATE MIGRATION m1nwm6w6uowkgs26ebavdelao4mhybuualvaarbgh45lfyzh3xfs4q
    ONTO m1zcsxr5k42qee666k6a6sxbdirrjr5esifd63joxsinpe2liysxgq
{
  ALTER TYPE sys_rep::SysRepUser {
      ALTER LINK report {
          RESET ON SOURCE DELETE;
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
