CREATE MIGRATION m13lky57rxvw5qqugajyojuyqxeh3q7o5atv62hznerftx72zie6fa
    ONTO m1bcdf6bcbsxhhpgp4qrrpi2tvkp7zvuwbq2dd7bve4fd2lpv6phlq
{
                              ALTER TYPE sys_core::SysDataObj {
      DROP LINK actionsQuery;
  };
};
