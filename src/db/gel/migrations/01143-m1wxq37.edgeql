CREATE MIGRATION m1wxq37rbpr47htmbeqe3auxmxqtcpeefgf4ntskj4fl6yjjitq3ya
    ONTO m1dk37pmrkxj672tc4mqcg3gbyrnrce66t4dxrsexemsuel3tnlf6q
{
  ALTER TYPE sys_core::SysObjAttrEnt {
      DROP LINK codeEntType;
  };
};
