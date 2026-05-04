<script lang="ts">
	import Cookies from 'js-cookie';

	async function register(e) {
		e.preventDefault();

		const form = document.querySelector('form') as HTMLFormElement;
		const formData = new FormData(form);
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const passwordRe = (document.getElementById('password-re') as HTMLInputElement).value;

		if (password !== passwordRe) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}

		await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					window.location.href = '/login';
				} else {
					alert('회원가입 실패: ' + data.message);
				}
			})
			.catch((error) => {
				console.error('회원가입 중 오류 발생:', error);
				alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
			});
	}
</script>

<div class="title">아래 정보를 입력해서 회원가입해주세요.</div>
<div class="form">
	<form action="/api/auth/register" method="post" onsubmit={register}>
		<div class="input-group">
			<label for="username">아이디:</label>
			<input type="text" id="username" name="username" required />
		</div>
		<div class="input-group">
			<label for="password">비밀번호:</label>
			<input type="password" id="password" name="password" required />
		</div>
		<div class="input-group">
			<label for="password-re">비밀번호 확인:</label>
			<input type="password" id="password-re" required />
		</div>
		<button type="submit">회원가입</button>
	</form>
</div>

<style>
	.title {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin-top: 50px;
	}

	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
	}

	.input-group {
		margin-bottom: 15px;
	}

	label {
		display: block;
		margin-bottom: 5px;
		font-weight: bold;
	}

	input {
		width: 300px;
		padding: 10px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		padding: 10px 20px;
		font-size: 16px;
		color: #fff;
		background-color: #222;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #333;
	}
</style>
