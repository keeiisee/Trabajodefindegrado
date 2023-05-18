import React from 'react'
import { ConPerfil } from './ConPerfil';
// import { SinPerfil } from './SinPerfil';
import { connect } from 'react-redux';

export const Perfil = ({ profile }) => {
  return (
    <>
    {profile && <ConPerfil />}
    </>
  )
}
const mapStateToProps = state => ({
  profile: state.auth.profile
});

export default connect(mapStateToProps)(Perfil);
