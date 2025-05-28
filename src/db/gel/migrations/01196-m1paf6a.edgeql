CREATE MIGRATION m1paf6a2fs6odnojv4nyt2y663caz3rndxh3ns55zebfncywqtv2ia
    ONTO m1qeja5jdffdanskpj57oyfahwc2mfirdjnje2putf2ba3tos55pfa
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER PROPERTY parm {
          RENAME TO parmValueStr;
      };
  };
};
