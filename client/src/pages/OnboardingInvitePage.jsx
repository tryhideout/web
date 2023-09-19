import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Heading, Text, Image, Input, Button } from '@chakra-ui/react';

import { loadHideoutData } from 'redux/actions/hideoutActions';
import double from 'assets/images/doubleline.svg';
import { showToast } from 'services/helpers';

const OnboardingInvitePage = (props) => {
	const { user, hideout, loadHideoutData } = props;

	useEffect(() => {
		const loadData = async () => {
			if (user.hideoutID !== null && hideout.name === null) await loadHideoutData(user.hideoutID);
		};
		loadData().catch(console.error);
	}, [user.hideoutID, hideout.name, loadHideoutData]);

	return (
		<Box display='flex' alignItems='center' justifyContent='center' height='100vh' width='100vw'>
			<Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' maxWidth='550px'>
				<Box flex='0.2'>
					<Image src={double} alt='Single' />
				</Box>
				<Heading mt='30px' size='2xl'>
					Invite your friends
				</Heading>
				<Box maxWidth='550px' fontFamily='Hubot' fontSize='20px' textAlign='center' mt='17px'>
					Let’s invite some of your roommates to join<br></br>{' '}
					<Text as='span' fontWeight='bold'>
						{hideout.name || ''}
					</Text>
					. Send them the below join code.
				</Box>
				<Box>
					<Input
						readOnly
						_hover={{ cursor: 'default' }}
						mt='30px'
						width='543px'
						textAlign='center'
						textTransform='uppercase'
						color='gray.600'
						fontWeight='bold'
						letterSpacing='5px'
						value={hideout.joinCode || ''}
					/>
				</Box>
				<Button
					disabled={hideout.joinCode === null}
					width='543px'
					variant='gradient500'
					mt='30px'
					onClick={() => {
						navigator.clipboard.writeText(hideout.joinCode);
						showToast.info('Join code copied!');
					}}
				>
					Copy join code
				</Button>
			</Box>
		</Box>
	);
};

const mapStateToProps = ({ user, hideout }) => ({ user, hideout });

export default connect(mapStateToProps, { loadHideoutData })(OnboardingInvitePage);