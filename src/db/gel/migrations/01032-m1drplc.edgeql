CREATE MIGRATION m1drplcx34fiwk23pjylwqvm4it7lydcsckgiwidziw5bslpc5x63q
    ONTO m1hfzpbekjsnhuanjyer25k6qxqctm24xbp3ouxgpllshdcph26koq
{
  ALTER TYPE sys_user::SysUser {
      CREATE PROPERTY isActive: std::bool;
  };
};
