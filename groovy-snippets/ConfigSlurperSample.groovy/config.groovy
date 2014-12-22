sample {
	foo = "foo-default"
	bar = "bar-default"
	baz = "baz-default"
}

// environmentsは環境ごとに設定を切り分けるための特別な記述
// new ConfigSlurper("dev") のように指定されると environments.dev の値で上書きされる
environments {
	dev {
		sample {
			foo = "foo-dev"
		}
	}
	prd {
		sample {
			bar = "bar-prd"
		}
	}
}
