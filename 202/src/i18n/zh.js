import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

let translate = {
   username_placeholder: "Username",
   password_placeholder: "Password",
   password:"password",
   log:"Log in",
   remember:"Remember Password",
   delete_sentence: 'Do you want to delete user',
   delete_user_warning_sentence: "Warning:if delete the user, user's local file will also be deleted",
   modified:"Modified",
   modified_user_warning_sentence: "Warning:The user's local folder name will also be modified after the user name has been modified!",
   cancel: 'Cancel',
   ok: 'OK',
   run:"Run",
   protocols:"Protocols",
   clear:"Clear",
   setting:"Setting",
   loT:"loT",
   favorites:"喜欢",
   list:"List",
   manage:"Manage",
   switch:"Switch user",
   change_password:"Change password",
   original_password:"Original password",
   new_password:"New password",
   input_again:"Input again",
   group:"group",
   no:"No",
   table_username:"User name",
   timeOldToNew:"Time(Old-New)",
   timeNewToOld:"Time(New-Old)",
   operation:"Operation",
   add:"Add",
   user:"User",
   advanced_user:"Advanced user",
   add_user:"Add user"
};

const zh = {
  language: translate,
  ...zhLocale,
}

export default zh
