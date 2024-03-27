#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import inquirer from 'inquirer'
import questions from './libs/prompts.mjs'
import chalk from 'chalk'

// 翻译文件Model
let LOCALEDATA = null
// 未替换文件
let NO_REPLACE_FILE = []

// 递归遍历文件夹下的所有文件
async function traverseFolder(folderPath, i18nFilePath) {
  if (!LOCALEDATA) {
    const i18nModel = await import(i18nFilePath)
    LOCALEDATA = i18nModel.default
  }

  const files = readdirSync(folderPath)
  files.forEach((file, index) => {
    const filePath = join(folderPath, file)
    if (statSync(filePath).isDirectory()) {
      traverseFolder(filePath, i18nFilePath) // 如果是文件夹，递归遍历
    } else {
      replaceInFile(filePath) // 如果是文件，进行替换操作
    }
  })
}

// 替换文件中的国际化代码
function replaceInFile(filePath) {
  let replaceCount = 0
  let noReplaceCount = 0
  let content = readFileSync(filePath, 'utf8')
  content = content.replace(
    /this\.\$t\('([^']+)'\)|\$t\('([^']+)'\)|{{ \$t\('([^']+)'\) }}/g,
    (match, key1, key2, key3) => {
      let key = key1 || key2 || key3

      const keys = key.split('.') // 拆分多级属性
      let value = LOCALEDATA
      let haveLocale = true
      for (const k of keys) {
        if (value[k]) {
          replaceCount += 1
          haveLocale = true
          value = value[k]
        } else {
          value = match // 如果找不到对应的中文，保留原始代码
          haveLocale = false
          noReplaceCount += 1
          NO_REPLACE_FILE.push(filePath)
          break
        }
      }
      return match.startsWith('{{') || !haveLocale ? value : "'" + value + "'"
    }
  )
  writeFileSync(filePath, content, 'utf8')
  if (replaceCount || noReplaceCount) {
    let log = `文件 ${filePath} ${chalk.green('替换了' + replaceCount + '处')}`
    if (noReplaceCount !== 0) {
      log += `，${chalk.red(noReplaceCount + '处没有被替换')}`
    }
    console.log(log)
  }
}

inquirer.prompt(questions).then((response) => {
  const { folderPath, i18nFilePath } = response
  if (!folderPath || !i18nFilePath) {
    console.log('文件夹路径或翻译文件路径不能为空')
    return
  }
  // try {
  //   traverseFolder(folderPath, i18nFilePath)
  // } catch (e) {
  //   console.log(chalk.red('转换失败'))
  // }
  traverseFolder(
    '/Users/xuexingwei/Desktop/code/admin-base/src/views',
    '/Users/xuexingwei/Desktop/code/admin-base/src/locale/i18n/zh.mjs'
  )
})
