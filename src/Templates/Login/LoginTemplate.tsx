import React, { ReactNode } from 'react'
import style from './LoginTemplate.module.css';

interface LoginTemplateProps {
	rightComponent: () => ReactNode;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({
	rightComponent,
}) => {
	return (
		<main className={style['login-template']}>
			<div className={style['left-section']}></div>
			<div className={style['right-section']}>
				{ rightComponent() }
			</div>
		</main>
	)
}

export default LoginTemplate;